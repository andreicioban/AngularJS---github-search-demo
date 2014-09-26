'use strict';

angular.module('Config', []).constant('Config',
    {
        searchTerm: 'Angular',
        searchCategories: [
            { name: 'repositories' },
            { name: 'users' }
        ]
    }
);