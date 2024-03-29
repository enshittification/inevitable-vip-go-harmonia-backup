import Test from '../../lib/tests/test';
import chalk from 'chalk';

export default class NpmScriptsTest extends Test {
	private packageJSON;
	private scripts;

	private npmScriptDoc = 'https://docs.wpvip.com/technical-references/node-js/#h-requirement-2-production-dependencies-and-npm-scripts';
	constructor() {
		super( 'NPM `scripts`', 'Checks `package.json` for `build` and `start` scripts' );
	}

	prepare() {
		this.packageJSON = this.getSiteOption( 'packageJSON' );
		this.scripts = this.packageJSON.scripts;
	}

	async run() {
		const start = this.scripts.start;
		const build = this.scripts.build;
		const serve = this.scripts.serve;

		if ( ! start ) {
			this.blocker( `${ chalk.bold( 'package.json' ) } is missing a ${ chalk.bold.underline( 'npm start' ) } script`,
				this.npmScriptDoc );
		}

		if ( ! build ) {
			this.blocker( `${ chalk.bold( 'package.json' ) } is missing a ${ chalk.bold.underline( 'npm build' ) } script`,
				this.npmScriptDoc );
		}

		if ( serve ) {
			this.warning( `Looks like your ${ chalk.bold( 'package.json' ) } has a ${ chalk.bold.underline( 'npm serve' ) } script. ` +
			'Please make sure this is not the script running your application. Your application must be served ' +
			`using ${ chalk.bold.underline( 'npm start' ) }.`, this.npmScriptDoc );
		}
	}
}
