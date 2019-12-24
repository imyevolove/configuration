import StateAccessor from "./StateAccessor";

/** Предоставляет доступ к управлению состоянием значения */
export default class State
{
    /** @type {StateAccessor} */
    #_stateAccessor;

    /**
     * Стандартный конструктор.
     * @param {StateAccessor} stateAccessor
     */
    constructor(stateAccessor)
    {
        this.#_stateAccessor = stateAccessor;
    }

    /**
     * Возвращает значение
     * @returns {any}
     */
    get value()
    {
        return this.#_stateAccessor.value;
    }

    /**
     * Устанавливает значение
     * @param {any} value
     */
    set value(value)
    {
        this.#_stateAccessor.value = value;
    }

    /**
     * Возвращает ключ значения в контейнере
     * @returns {any}
     */
    get key()
    {
        return this.#_stateAccessor.key;
    }

    /**
     * Возвращает значение типа Boolean
     * @returns {bool}
     */
    get asBoolean()
    {
        let value = this.value;

        if (typeof value == "boolean") return value;
        if (typeof value == "number") return value == 1;

        return !!value;
    }

    /**
     * Возвращает значение типа Number
     * @returns {bool}
     */
    get asInteger()
    {
        let value = this.value;
        return this.#executeForValue(value, parseInt, 0);
    }

    /**
     * Возвращает значение типа Number
     * @returns {bool}
     */
    get asFloat()
    {
        let value = this.value;
        return typeof value == "number" ? value : this.#executeForValue(value, parseFloat, 0);
    }

    #executeForValue(value, func, defaultValue)
    {
        try
        {
            return func(value);
        }
        catch (e)
        {
            return defaultValue;
        }
    }
}