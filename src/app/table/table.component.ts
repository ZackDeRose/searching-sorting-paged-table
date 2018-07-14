import { Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  heroes$ = new BehaviorSubject<{[name: string]: any}>({
    'Hammerer Maccabeus': {
      name: 'Hammerer Maccabeus',
      types: 'Holy/Fire',
      attack: 1,
      defense: 1,
      speed: 1,
      healing: 1,
      recovery: 1,
      health: 5
    },
    'Ethereal Moodmorph': {
      name: 'Ethereal Moodmorph',
      types: 'Water/Fire',
      attack: 1,
      defense: 1,
      speed: 1,
      healing: 1,
      recovery: 1,
      health: 5
    }
  });

  tableDataSource$ = new BehaviorSubject<any[]>([]);
  displayedColumns$ = new BehaviorSubject<string[]>([
    'name',
    'types',
    'attack',
    'defense',
    'speed',
    'healing',
    'recovery',
    'health',
    'levelUp'
  ]);

  constructor() { }

  ngOnInit() {
    this.heroes$.subscribe(changedHeroData => {
      this.tableDataSource$.next(Object.values(changedHeroData));
    });
  }

  levelUp(heroName: string) {
    const updatedHero = { ... this.heroes$.value[heroName] };
    updatedHero.attack++;
    updatedHero.defense++;
    updatedHero.speed++;
    updatedHero.recovery++;
    updatedHero.healing++;
    updatedHero.health++;

    const newHeroData = { ... this.heroes$.value };
    newHeroData[heroName] = updatedHero;

    this.heroes$.next(newHeroData);
  }

}
