# @hooksbelt/use-mobx

## What is it?

React hooks for define and use MobX primitives

### Example

```tsx
import { observer } from 'mobx-react-lite'
import { useObservable, useAction } from 'use-mobx'

const App = observer(() => {
    const counter = useObservable(0)
    const increment = useAction(() => counter(counter() + 1))

    return (
        <div>
            <p>You click {counter()} times</p>
            <button onClick={increment}>Click me</button>
        </div>,
    )
})
```

#### Observable

```tsx
useObservable<T>(value: T): Observable<T>
```

```tsx
useObservable<T>(value: T, deps: DependencyList): Observable<T>
```

```tsx
useObservable<T>(value: T, options: CreateObservableOptions): Observable<T>
```

```tsx
useObservable<T>(value: T, options: CreateObservableOptions, deps: DependencyList): Observable<T>
```

```tsx
// create observable value
const counter = useObservable(1)

// get value
counter()

// set value
counter(2)
```

#### Computed

```tsx
useComputed<T>(reducer: () => T): Computed<T>
```

```tsx
useComputed<T>(reducer: () => T, deps: DependencyList): Computed<T>
```

```tsx
useComputed<T>(reducer: () => T, options: IComputedValueOptions<T>): Computed<T>
```

```tsx
useComputed<T>(reducer: () => T, options: IComputedValueOptions<T>, deps: DependencyList): Computed<T>
```

```tsx
// create computed value
const multiplied = useComputed(() => counter() * 2)

// get value
multiplied()
```

#### Observable array

```tsx
useObservableArray<T>(): ObservableArray<T>
```

```tsx
useObservableArray<T>(initialValues: T[]): ObservableArray<T>
```

```tsx
useObservableArray<T>(initialValues: T[], deps: DependencyList): ObservableArray<T>
```

```tsx
useObservableArray<T>(initialValues: T[], options: CreateObservableOptions): ObservableArray<T>
```

```tsx
useObservableArray<T>(initialValues: T[], options: CreateObservableOptions, deps: DependencyList): ObservableArray<T>
```

#### Observable Set

```tsx
useObservableSet<T>(initialValues: IObservableSetInitialValues<T>): ObservableSet<T>
```

```tsx
useObservableSet<T>(initialValues: IObservableSetInitialValues<T>, deps: DependencyList): ObservableSet<T>
```

```tsx
useObservableSet<T>(initialValues: IObservableSetInitialValues<T>, options: CreateObservableOptions): ObservableSet<T>
```

```tsx
useObservableSet<T>(initialValues: IObservableSetInitialValues<T>, options: CreateObservableOptions, deps: DependencyList): ObservableSet<T>
```

#### Observable Map

```tsx
useObservableMap<K, V>(initialValues: IObservableMapInitialValues<K, V>): ObservableMap<K, V>
```

```tsx
useObservableMap<K, V>(initialValues: IObservableMapInitialValues<K, V>, deps: DependencyList): ObservableMap<K, V>
```

```tsx
useObservableMap<K, V>(initialValues: IObservableMapInitialValues<K, V>, options: CreateObservableOptions): ObservableMap<K, V>
```

```tsx
useObservableMap<K, V>(initialValues: IObservableMapInitialValues<K, V>, options: CreateObservableOptions, deps: DependencyList): ObservableMap<K, V>
```

#### Box (like observable but not reactive, just a container)

```tsx
useBox<T>(value: T, deps?: DependencyList): Box<T>
```

#### Action

```tsx
useAction<T>(fn: (...args: any[])=> T, deps?: DependencyList): (...args: any[])=> T
```

You can use generators to define the action, in which case you will get a mobx-flow

```tsx
useAction<T>(fn: (...args: any[])=> Generator<T>, deps?: DependencyList): (...args: any[])=> CancellablePromise<T>
```

#### Reaction

```tsx
useReaction<T, FireImmediately extends boolean = false>(fn: () => T, effect: (arg: T, prev: FireImmediately extends true ? T | undefined : T) => void): void;
```

```tsx
useReaction<T, FireImmediately extends boolean = false>(fn: () => T, effect: (arg: T, prev: FireImmediately extends true ? T | undefined : T) => void, deps: DependencyList): void
```

```tsx
useReaction<T, FireImmediately extends boolean = false>(fn: () => T, effect: (arg: T, prev: FireImmediately extends true ? T | undefined : T) => void, options: IReactionOptions<T, FireImmediately>): void
```

```tsx
useReaction<T, FireImmediately extends boolean = false>(fn: () => T, effect: (arg: T, prev: FireImmediately extends true ? T | undefined : T) => void, options: IReactionOptions<T, FireImmediately>, deps: DependencyList): void
```

#### Autorun

```tsx
useAutorun(fn: () => void): void
```

```tsx
useAutorun(fn: () => void, deps: DependencyList): void
```

```tsx
useAutorun(fn: () => void, options: IAutorunOptions): void
```

```tsx
useAutorun(fn: () => void, options: IAutorunOptions, deps: DependencyList): void
```

#### When

```tsx
useWhen(predicate: () => boolean, effect: () => void): void
```

```tsx
useWhen(predicate: () => boolean, effect: () => void, deps: DependencyList): void
```

```tsx
useWhen(predicate: () => boolean, effect: () => void, options: IWhenOptions): void
```

```tsx
useWhen(predicate: () => boolean, effect: () => void, options: IWhenOptions, deps: DependencyList): void
```
