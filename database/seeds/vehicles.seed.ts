import axios from 'axios';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Seeder } from '@jorgebodega/typeorm-seeding';

import { VehicleEntity } from '@entities/vehicles/entity/vehicle.entity';

@Injectable()
export default class VehiclesSeed extends Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    async function runner(url: string): Promise<undefined> {
      const response = await axios.get(url).then((response) => response.data);

      const vehicles = response.results.map((vehicle: VehicleEntity) => {
          return {
            id: +vehicle['url'].split('/')[5],
            name: vehicle.name,
            model: vehicle.model,
            manufacturer: vehicle.manufacturer,
            cost_in_credits: vehicle.cost_in_credits,
            length: vehicle.length,
            max_atmosphering_speed: vehicle.max_atmosphering_speed,
            crew: vehicle.crew,
            passengers: vehicle.passengers,
            cargo_capacity: vehicle.cargo_capacity,
            consumables: vehicle.consumables,
            vehicle_class: vehicle.vehicle_class,
            created: vehicle.created,
            edited: vehicle.edited
          };
        });

        await dataSource
        .createQueryBuilder()
        .insert()
        .into(VehicleEntity)
        .values(vehicles)
        .execute();

      if (response.next) {
        return runner(response.next);
      }
    }
    const url = 'https://swapi.dev/api/vehicles/?page=1';
    return runner(url);
  }
}
