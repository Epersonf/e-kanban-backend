export class Action<T=void, U=void, V=void, W=void> {

  private funcs: ({ key: string, func: (t: T, u: U, v: V, w: W) => void })[] = [];

  constructor() {
    this.funcs = [];
  }

  public subscribe(key: string, func: (t: T, u: U, v: V, w: W) => void): string {
    this.funcs.push({
      key,
      func,
    });
    return key;
  }

  public unsubscribe(key: string): void {
    this.funcs = this.funcs.filter((f) => f.key !== key);
  }

  public publish(t: T, u: U, v: V, w: W): void {
    this.funcs.forEach((f) => f.func(t, u, v, w));
  }

  public getSubscriptionsSize(): number {
    return this.funcs.length;
  }

  public clear(): void {
    this.funcs = [];
  }

}