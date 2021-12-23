
import { createMapper, mapFrom } from '@automapper/core';
import { classes } from '@automapper/classes';

import customer from './Models/customerModel';

import customerVM from './ViewModels/customerViewModel';

export default class Mapper {
    static mapper = createMapper({
        name: 'reqter',
        pluginInitializer: classes,
    });

    static initiate = () => {
        Mapper.mapper = createMapper({
            name: 'reqter',
            pluginInitializer: classes
        });
        Mapper.mapper.createMap(customer, customerVM);
    }
}