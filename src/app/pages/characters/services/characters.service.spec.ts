import { environment } from './../../../../environments/environment';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CharactersDataService } from './characters-data.service';
import { CharactersMock } from './characters.mock';

const baseUrl = environment.BASE_URL;
const params = environment.PARAMS;

const mockData = {
  api: `${baseUrl}/characters${params}&orderBy=name&offset=0&limit=36`,
  data: CharactersMock,
};


describe(CharactersDataService.name, () => {
  let service: CharactersDataService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [CharactersDataService]
    });
    service = TestBed.inject(CharactersDataService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${CharactersDataService.prototype.getWithQuery.name} should return characters`, done => {
    service.getWithQuery('').subscribe( character => {
      expect(character[0].name).toBe('3-D Man');
      expect(character[1].name).toBe('A-Bomb (HAS)');
      done();
    });
    httpController.expectOne(mockData.api)
      .flush(mockData.data);
  })
});
