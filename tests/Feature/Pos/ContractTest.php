<?php

namespace Tests\Feature\Pos;

class ContractTest extends PosTestCase
{
    public function test_openapi_covers_every_registered_pos_method_and_device_auth_stays_stateless(): void
    {
        $document = json_decode(file_get_contents(base_path('docs/pos/openapi.json')), true, 512, JSON_THROW_ON_ERROR);
        $count = 0;
        foreach (app('router')->getRoutes()->getRoutes() as $route) {
            if (!str_starts_with($route->uri(), 'api/pos/v1/') && !str_starts_with($route->uri(), 'pos/backend/')) { continue; }
            foreach ($route->methods() as $method) {
                if ($method === 'HEAD') { continue; }
                $this->assertArrayHasKey(strtolower($method), $document['paths']['/'.$route->uri()]); $count++;
            }
            if (str_starts_with($route->uri(), 'api/pos/v1/')) {
                $middleware = $route->gatherMiddleware();
                $this->assertContains('pos-api', $middleware);
                $this->assertNotContains('web', $middleware); $this->assertNotContains('api', $middleware);
            }
        }
        $this->assertSame(57, $count);
        $this->assertSame(6, count($document['components']['schemas']['PushRequest']['properties']['events']['items']['oneOf']));
    }
}
