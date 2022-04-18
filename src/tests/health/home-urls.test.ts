import fetch, { FetchError } from 'node-fetch';
import BaseHealthTest from './base.test';
import getUrls from 'get-urls';
import { TimedResponse } from '../../utils/http';
import Issue from '../../lib/issue';
import chalk from 'chalk';

export default class HomeURLsTest extends BaseHealthTest {
	protected paths: string[] = []

	constructor() {
		super( 'Testing with home URLs',
			'Fetches URLS from the index and check their availability' );
	}

	async prepare() {
		await super.prepare();

		// Get all the homepage URLs
		this.paths = await this.getHomepagePaths( );

		if ( ! this.paths || this.paths?.length === 0 ) {
			this.skip( 'No URLs available for testing' );
		}
	}

	async getHomepagePaths( limit = 10 ) {
		try {
			// Get random URLs from homepage
			const homepageRequest = await fetch( this.baseURL );
			const homepageContent = await homepageRequest.text();
			const allURLs = this.filterPaths(
				Array.from( getUrls( homepageContent, { extractFromQueryString: true, requireSchemeOrWww: true } ) ) );
			return allURLs.slice( 0, limit );
		} catch ( error ) {
			if ( error instanceof FetchError ) {
				throw this.blocker( `Error fetching ${ this.baseURL }: ${ ( error as FetchError ).message }` );
			}
			throw error;
		}
	}

	async handleRequest( request: TimedResponse ): Promise<Issue> {
		if ( request.response.status === 404 ) {
			return this.warning( `${ chalk.bold( request.url ) } responded with a ${ chalk.yellow( '404 - Not Found' ) } in ${ chalk.yellow( request.duration + 'ms' ) }` );
		}

		return super.handleRequest( request );
	}
}
