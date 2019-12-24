import ConfigurationContainer from "./ConfigurationContainer";

/** Предоставляет доступ к значению */
export default class StateAccessor
{
    /**
     * 
     * @param {ConfigurationContainer} container
     * @param {string} key
     */
    constructor(container, key)
    {
        this.container = container;
        this.key = key;
    }

    /** 
     * Возвращает значение
     * @returns {any}
     */
    get value()
    {
        return this.container.get(this.key);
    }

    /**
     * Устанавливает значение
     * @param {any} value
     */
    set value(value)
    {
        this.container.set(this.key, value);
    }
}