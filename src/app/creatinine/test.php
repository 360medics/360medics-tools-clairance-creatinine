<?php

function tools_clairance_creatinine_compute($p) {
    // Age / year


    if(isset($p->year) && $p->year != '')
    {
        $year = $p->year;
        $now = new DateTime();
        $fulldate = $p->year.'-01-01 00:00:01';
        $birthday = new DateTime($fulldate);
        $interval = $now->diff($birthday);
        $age = $interval->format('%y');
    } elseif(isset($p->age) && $p->age != '') {
        $age = intval($p->age);
        $year = date('Y') - $age;
    } else {
        exit('{"erreur":"Remplissez l\'anne de naissance ou l\'âge du sujet."}');
    }
    
    // COCKROFT FORMULE 2 (creatinimie en µmol/L)
    $coef = 140;
    $k = ($p->sex == 'male') ? 1.23 : 1.04;
    
    if(intval($p->createUnite) == 2)
        $creat = ($p->creaumol / 10) * 88.4;
    else
        $creat = $p->creaumol;
    
    $cockroft = ( ((140 - intval($age)) / $creat) * floatval($p->weight) * floatval($k) );
    
    // COCKROFT FORMULE 1 (creatinimie en mg/dL)
    /*
    if($p->createUnite == 2) {
        $cockroft = $cockroft / 7.2;
    }
    */
    $cockroft = round($cockroft,2);
        
    $m1 = $m2 = 1;
    
    if($p->sex == 'female')
    {
        $m1 = 0.742;
    } 
    
    if($p->skincolor == 'black')
    {
        $m2 = 1.212;
    }
    
    
    // MDRD FORMULE 2 (creatinimie en µmol/L)
    if(intval($p->createUnite) == 2)
        $creat2 = $p->creaumol / 10;
    else
        $creat2 = $p->creaumol;
    
    
    $MDRD = 186 * pow( ($creat2 * 0.0113), -1.154) * pow($age, -0.203) * $m1 * $m2;
    
    
    // MDRD FORMULE 1 (creatinimie en mg/dL)
    if($p->createUnite == 2) {
        $MDRD = $MDRD * pow(88.5,-1.154);
    }
    $MDRD = round($MDRD, 2);
    
    // Interpretations cockroft: 
    $slidePercCock = ($cockroft / 120 )* 100;
    if($slidePercCock < 10) {
        $slidePercCock = 10;
    }
    if($slidePercCock > 90) {
        $slidePercCock = 90;
    }
    
    if ($cockroft <= 30) {
        $slideClassCock = 'severe';
        $paraCock = " Insuffisance rénale sévère";
    } elseif($cockroft <= 60) {
        $slideClassCock = 'modere';
        $paraCock = "Insuffisance rénale modérée";
    } elseif($cockroft <= 80) {
        $slideClassCock = 'legere';
        $paraCock = "Insuffisance rénale légère";
    } else {
        $slideClassCock = 'normal';
        $paraCock = "Valeurs normales";
    }
    $this->to_info_clair('paraCock', $paraCock);
    $this->to_info_clair('slideClassCock', $slideClassCock);
    $this->to_info_clair('slidePercCock', $slidePercCock);
    
    //interpretation MDRD
    $slidePercMdrd = ($MDRD / 120 )* 100;
    if($slidePercMdrd < 10) {
        $slidePercMdrd = 10;
    }
    if($slidePercMdrd > 90) {
        $slidePercMdrd = 90;
    }
    
    if ($MDRD <= 30) {
        $slideClassMdrd = 'severe';
        $paraMdrd = " Insuffisance rénale sévère";
    } elseif($MDRD <= 60) {
        $slideClassMdrd = 'modere';
        $paraMdrd = "Insuffisance rénale modérée";
    } elseif($MDRD <= 80) {
        $slideClassMdrd = 'legere';
        $paraMdrd = "Insuffisance rénale légère";
    } else {
        $slideClassMdrd = 'normal';
        $paraMdrd = "Valeurs normales";
    }
    $this->to_info_clair('paraMdrd', $paraMdrd);
    $this->to_info_clair('slideClassMdrd', $slideClassMdrd);
    $this->to_info_clair('slidePercMdrd', $slidePercMdrd);
    
    $this->to_info_clair('cockroft', $cockroft);
    $this->to_info_clair('MDRD', $MDRD);
}

function tools_imc_compute($height,$weight){
	
		
		$height = floatval(str_replace(",", ".", $height) /100 );
		$IMC = $weight / ($height * $height);
		$IMC = round($IMC,2);

		
		//interprétation IMC
		if ($IMC <= 16.5) {
			$legendClassImc = 'L1';
			$slidePercImc = $this->calcPercSlideImc($IMC,0,16.5,0,14);
		} elseif($IMC <= 18.5) {
			$legendClassImc = 'L2';
			$slidePercImc = $this->calcPercSlideImc($IMC,16.5,18.5,15,21);
		} elseif($IMC <= 25) {
			$legendClassImc = 'L3';
			$slidePercImc = $this->calcPercSlideImc($IMC,18.5,25,22,37);
		} elseif($IMC <= 30) {
			$legendClassImc = 'L4';
			$slidePercImc = $this->calcPercSlideImc($IMC,25,30,37.5,52);
		} elseif($IMC <= 35) {
			$legendClassImc = 'L5';
			$slidePercImc = $this->calcPercSlideImc($IMC,30,35,53,67.5);
		} elseif($IMC <= 40) {
			$legendClassImc = 'L6';
			$slidePercImc = $this->calcPercSlideImc($IMC,35,40,68.5,83);
		} else {
			$legendClassImc = 'L7';
			$slidePercImc = $this->calcPercSlideImc($IMC,40,45,84,98);
		}

		$return['IMC'] = $IMC;
		$return['legendClassImc'] = $legendClassImc;
		$return['slidePercImc'] = $slidePercImc;

		$this->to_info_clair('imc', $return);
    }
    
    function calcPercSlideImc($imc,$seuilMin,$seuilMax,$percentMin,$percentMax) {
		$percent = round(($imc - $seuilMin) / ($seuilMax - $seuilMin),2);
		$value = $percentMin + ($percent*($percentMax - $percentMin));

		if($value > 98){
			$value = 98;
		}

		return $value;
	}