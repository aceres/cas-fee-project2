import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const recipes = [
      { id: 1, name: 'Pasta' },
      { id: 2, name: 'Apfelkuchen' },
      { id: 3, name: 'Mohnkuchen' },
      { id: 4, name: 'Fleischkäse' },
      { id: 5, name: 'Salat' },
      { id: 6, name: 'Hamburger' },
      { id: 7, name: 'Pierogi' },
      { id: 8, name: 'Tomatensalat' },
      { id: 9, name: 'Sandwich' },
      { id: 10, name: 'Spahetti Carbonara' }
    ];
    return {recipes};
  }
}
