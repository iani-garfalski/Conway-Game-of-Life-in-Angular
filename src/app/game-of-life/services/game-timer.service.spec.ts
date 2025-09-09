// services/game-timer.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { GameTimerService } from './game-timer.service';

describe('GameTimerService (zoneless)', () => {
  let service: GameTimerService;
  let callbackSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        GameTimerService
      ]
    });
    service = TestBed.inject(GameTimerService);
    callbackSpy = jasmine.createSpy('callback');
  });

  afterEach(() => {
    service.stop();
    callbackSpy.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(service.tickMs()).toBe(200);
    expect(service.running()).toBe(true);
  });

  describe('setCallback()', () => {
    it('should set the callback function', () => {
      service.setSpeed(1000); // slow tick to prevent the callback from firing immediately
      service.setCallback(callbackSpy);
      expect(callbackSpy).not.toHaveBeenCalled();
    });
  });

  describe('toggleRunning()', () => {
    it('should toggle running state', () => {
      expect(service.running()).toBe(true);

      service.toggleRunning();
      expect(service.running()).toBe(false);

      service.toggleRunning();
      expect(service.running()).toBe(true);
    });
  });

  describe('setSpeed()', () => {
    it('should set tick milliseconds with validation', () => {
      service.setSpeed(100);
      expect(service.tickMs()).toBe(100);

      service.setSpeed(5);
      expect(service.tickMs()).toBe(10);

      service.setSpeed(6000);
      expect(service.tickMs()).toBe(5000);
    });
  });

  describe('start() and stop()', () => {
    it('should start and stop the timer', () => {
      service.stop();
      expect(service.running()).toBe(false);

      service.start();
      expect(service.running()).toBe(true);
    });
  });

  describe('timer behavior', () => {
    function delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    it('should call callback when running and timer elapses', async () => {
      service.setCallback(callbackSpy);
      service.setSpeed(50); // shorter for faster tests
      service.start();

      await delay(60);
      expect(callbackSpy).toHaveBeenCalledTimes(1);

      await delay(60);
      expect(callbackSpy).toHaveBeenCalledTimes(2);
    });

    it('should not call callback when stopped', async () => {
      service.setCallback(callbackSpy);
      service.stop();
      service.setSpeed(50);

      await delay(100);
      expect(callbackSpy).not.toHaveBeenCalled();
    });

    it('should restart timer when speed changes', async () => {
      service.setCallback(callbackSpy);
      service.start();

      service.setSpeed(100);
      await delay(50); // halfway through
      service.setSpeed(200); // restart with new interval

      await delay(100);
      expect(callbackSpy).toHaveBeenCalledTimes(0);

      await delay(120);
      expect(callbackSpy).toHaveBeenCalledTimes(1);
    });
  });
});
