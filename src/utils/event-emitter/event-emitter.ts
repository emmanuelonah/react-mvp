type State = Record<string, string>;
type Listener = (state: State) => void;

interface Observer {
  event: string;
  listener: Listener;
}

interface Subject {
  on(event: string, listener: Listener): void;
  off(event: string, listener: Listener): void;
  emit(event: string): void;
}

class EventEmitterSubject implements Subject {
  private state: State;

  private observers: Observer[] = [];

  constructor() {
    this.state = {
      name: 'EventEmitterSubject',
      pattern: 'Observer',
    };
  }

  public on(event: string, listener: Listener): void {
    this.observers.push({ event, listener });
  }

  public off(event: string): void {
    if (!this.observers.length) return;

    this.observers.forEach((obs, index, observers) => {
      if (obs.event === event) {
        console.log('BEFORE REMOVAL ⚠️', {
          ALL_OBSERVERS: observers,
          OBSERVER_TO_REMOVE: obs,
        });
        this.observers.splice(index, 1);

        console.log('AFTER REMOVAL ✅', {
          ALL_OBSERVERS: observers,
          OBSERVER_TO_REMOVE: obs,
        });
      }
    });
  }

  public emit(event: string): void {
    this.observers.forEach((observer) => {
      if (observer.event === event) {
        observer.listener(this.state);
      }
    });
  }
}

const eEmitter = new EventEmitterSubject();

eEmitter.on('greet', (state) => {
  console.log('Good morning viewers', JSON.stringify(state));
});

eEmitter.on('greet', (state) => {
  const jsCoreSynchronousConcatenation = 'Ibö'.concat('lachi', ' Chikwendu Emmanuel Jeremiah Joseph Onah Jnr');

  console.log(jsCoreSynchronousConcatenation, JSON.stringify(state));
});

eEmitter.emit('greet');

eEmitter.off('greet');
