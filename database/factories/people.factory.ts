import { define } from 'typeorm-seeding';
import { PeopleEntity } from '../../src/entity/people/peopleEntity/people.entity';

define(PeopleEntity, () => {
  const person = new PeopleEntity();
  person.name = 'sd';
  person.height = 'sd';
  person.mass = 'sd';
  person.hair_color = 'sd';
  person.skin_color = 'sd';
  person.eye_color = 'sd';
  person.birth_year = 'sd';
  person.gender = 'sd';
  person.created = 'sd';
  person.edited = 'sd';

  return person;
});
