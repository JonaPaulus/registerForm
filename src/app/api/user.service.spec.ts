import { TestBed, waitForAsync, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserApiService } from '@api/user.service';
import fetchMock from 'fetch-mock';
import assert from 'assert';

describe('UserApiService', () => {
  let service: UserApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        { provide: service, useClass: UserApiService }
      ],
    });
    service = TestBed.inject(UserApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 200 on success',
    waitForAsync(inject([HttpTestingController, UserApiService],
    async (httpClient: HttpTestingController, userApiService: UserApiService) => {
    
      // preperation
      const postRegistration = {
        firstName: 'jona',
        lastName: 'pauw',
        email: 'me@me.nl',
        pw1: 'aaaaAAAA',
        pw2: 'aaaa'
      };

      // execution
      fetchMock.mock('https://demo-api.now.sh/users', 200);
      const res = await fetch('https://demo-api.now.sh/users');

      // checking results
      assert(res.ok);

      // reset
      fetchMock.restore();
  })));

});
