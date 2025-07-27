import {calculate, Pokemon, Move} from '../adaptable';
import type * as I from '../data/interface';

import * as calc from '../index';
import {Dex} from '@pkmn/dex';
import {Generations} from './gen';

const pkmn = {Generations: new Generations(Dex)};

const gens = [1, 2, 3, 4, 5, 6, 7, 8, 9] as I.GenerationNum[];

describe('Generations', () => {
  test.skip('abilities', () => {
    expect(true).toBe(true);
  });

  test.skip('items', () => {
    expect(true).toBe(true);
  });

  test.skip('moves', () => {
    expect(true).toBe(true);
  });

  test.skip('species', () => {
    expect(true).toBe(true);
  });

  test.skip('types', () => {
    for (const gen of gens) {
      const p = Array.from(pkmn.Generations.get(gen).types);
      const c = new Map<I.ID, I.Type>();
      for (const type of calc.Generations.get(gen).types) c.set(type.id, type);

      expect(Array.from(c.values()).map(s => s.name).sort()).toEqual(p.map(s => s.name).sort());
      for (const type of p) {
        expect(c.get(type.id)).toEqual(type);
        c.delete(type.id);
      }
      expect(c.size).toBe(0);
    }
  });

  test.skip('natures', () => {
    for (const gen of gens) {
      const p = Array.from(pkmn.Generations.get(gen).natures);
      const c = new Map<I.ID, I.Nature>();
      for (const nature of calc.Generations.get(gen).natures) c.set(nature.id, nature);

      expect(Array.from(c.values()).map(s => s.name).sort()).toEqual(p.map(s => s.name).sort());
      for (const nature of p) {
        expect(c.get(nature.id)).toEqual(nature);
        c.delete(nature.id);
      }
      expect(c.size).toBe(0);
    }
  });
});

describe('Adaptable', () => {
  test.skip('usage', () => {
    const gen = pkmn.Generations.get(5);
    const result = calculate(
      gen,
      new Pokemon(gen, 'Gengar', {
        item: 'Choice Specs' as I.ItemName,
        nature: 'Timid',
        evs: {spa: 252},
        boosts: {spa: 1},
      }),
      new Pokemon(gen, 'Chansey', {
        item: 'Eviolite' as I.ItemName,
        nature: 'Calm',
        evs: {hp: 252, spd: 252},
      }),
      new Move(gen, 'Focus Blast')
    );
    expect(result.range()).toEqual([274, 324]);
  });
});
