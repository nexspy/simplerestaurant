const URLS = {
    // 'base_url': 'http://localhost:5000',
    'base_url': 'https://nirmal-restaurantapp.herokuapp.com',
    'api_version': '/v1/api',
    'menu': {
        'base': '/menus',
        'suggestions': '/menus/suggestions',
        'list': '/menus',
        'create': '/menus/create',
    },
    'food': {
        'base': '/foods',
        'list': '/foods',
        'create': '/foods/create',
        'publish': '/foods/action/publish',
        'unpublish': '/foods/action/unpublish',
        'delete': '/foods/action/delete',
    },
    'order': {
        'base': '/orders',
        'list': '/orders',
        'create': '/orders/create',
        'current': '/orders/current'
    }
};

export default URLS;