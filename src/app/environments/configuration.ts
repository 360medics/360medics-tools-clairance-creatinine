export class ConfigurationSingleton
{
    env: any = {};

    DOCTYPES_SUPPORTED_IMAGES: Array<string> = ['jpg', 'jpeg', 'png', 'tiff', 'bmp']
    DOCTYPES_SUPPORTED_BY_PAPERVIEW_VIEWER: Array<string> = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'html']

    bootstrap(environment: any)
    {
        this.env = environment
    }

    all()
    {
        return this.env
    }

    get(key: string)
    {
        if (typeof this.env[key]  === 'undefined') {
            throw Error(`configuration.ts Environment variable ${key} is not defined. Did you forget to Configuration.bootstrap(environment)?`);
        }

        return this.env[key];
    }

    getEnv()
    {
        return this.env.name;
    }
}

export let Configuration = new ConfigurationSingleton();
