import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { ComicsService } from './comics-data.service';
import { ComicsMock } from './commics.mock';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


const baseUrl = environment.BASE_URL;
const params = environment.PARAMS;

const mockData = {
  api: `${baseUrl}/comics${params}&offset=0&limit=12`,
  data: ComicsMock,
};

describe(ComicsService.name, () => {
  let service: ComicsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [ComicsService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ComicsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it(`#${ComicsService.prototype.getComics.name} should return comics`, done => {
    service.getComics().subscribe(comics => {
      expect(comics[0].title).toBe('Marvel Previews (2017)');
      done();
    });
    httpController.expectOne(mockData.api)
      .flush(mockData.data);
  });
});
