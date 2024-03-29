import {
	EnvironmentVariables,
	Harmonia,
	SiteConfig,
} from './index';
import ExampleTest from './tests/example.test';

const harmonia = new Harmonia();

// Create dummy site option
const siteOptions: SiteConfig = new SiteConfig( {
	baseURL: 'http://localhost:1234',
	siteID: 1,
	nodejsVersion: '14.15',
	repository: 'wpcomvip/test',
} );

const envVars: EnvironmentVariables = new EnvironmentVariables( {
	THIS_IS_A_TEST: 'true',
	HELLO: 123,
} );

harmonia.bootstrap( siteOptions, envVars );

harmonia.registerTest( new ExampleTest() );
harmonia.registerTest( new ExampleTest() );
harmonia.registerTest( new ExampleTest() );

harmonia.run().then( () => {
	console.log( harmonia.resultsJSON() );
} );
