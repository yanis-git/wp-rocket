import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

// Internal dependencies
import { WP_BASE_URL } from './wp.config';

const config: PlaywrightTestConfig = {
	globalSetup: require.resolve('./setup/global-setup'),
	testDir: './src',
	/* Maximum time one test can run for. */
	timeout: 90000,
	globalTimeout: 900000,
	reportSlowTests: null,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: 1,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'list',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		baseURL: WP_BASE_URL,
		headless: true,
		viewport: {
			width: 960,
			height: 700,
		},
		ignoreHTTPSErrors: true,
		locale: 'en-US',
		contextOptions: {
			reducedMotion: 'reduce',
			strictSelectors: true,
		},
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
		video: 'on-first-retry',
		// Tell all tests to load signed-in state from 'storageState.json'.
		storageState: 'tests/e2e/storageState.json',
		actionTimeout: 10_000, // 10 seconds.
	},
	webServer: {
		command: 'npm run wp-env start',
		port: 8888,
		timeout: 120_000, // 120 seconds.
		reuseExistingServer: true,
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chrome',
			use: {
				...devices['Desktop Chrome'],
			},
		},

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: {
		//     ...devices['Pixel 5'],
		//   },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: {
		//     ...devices['iPhone 12'],
		//   },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: {
		//     channel: 'msedge',
		//   },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: {
		//     channel: 'chrome',
		//   },
		// },
	],
};

export default config;
