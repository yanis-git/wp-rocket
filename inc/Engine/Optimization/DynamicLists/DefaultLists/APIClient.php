<?php
declare(strict_types=1);

namespace WP_Rocket\Engine\Optimization\DynamicLists\DefaultLists;

use WP_Rocket\Engine\Optimization\DynamicLists\AbstractAPIClient;

class APIClient extends AbstractAPIClient {

	protected function get_api_path() {
		return 'exclusions/list';
	}

}
