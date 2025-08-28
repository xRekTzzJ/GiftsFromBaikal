type EventHandler<T = any> = (payload: T) => void

export class EventAggregator {
  private events: Map<string, EventHandler[]> = new Map()

  /** Подписка на событие. Возвращает функцию отписки */
  public subscribe<T>(event: string, handler: EventHandler<T>): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }
    this.events.get(event)!.push(handler)

    // возвращаем функцию отписки
    return () => this.unsubscribe(event, handler)
  }

  /** Отписка от события */
  public unsubscribe<T = any>(event: string, handler: EventHandler<T>) {
    const handlers = this.events.get(event)
    if (!handlers) return
    this.events.set(
      event,
      handlers.filter((h) => h !== handler)
    )
  }

  /** Публикация события */
  public publish<T = any>(event: string, payload?: T) {
    const handlers = this.events.get(event)
    if (!handlers) return
    handlers.forEach((h) => h(payload))
  }

  /** Проверка, есть ли подписчики на событие */
  public hasSubscribers(event: string): boolean {
    const handlers = this.events.get(event)
    return !!handlers && handlers.length > 0
  }
}
