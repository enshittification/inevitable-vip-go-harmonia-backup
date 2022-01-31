import Harmonia from './harmonia';
import SiteConfig from './lib/configs/site.config';
import EnvironmentVariables from './lib/configs/envvars.config';

const harmonia = new Harmonia();

// Create dummy site option
const siteOptions: SiteConfig = new SiteConfig( 1, '14.15', 'wpcomvip/test' );
const envVars: EnvironmentVariables = new EnvironmentVariables( {
	THIS_IS_A_TEST: 'true',
	HELLO: 123,
} );

harmonia.bootstrap( siteOptions, envVars );
harmonia.run();
