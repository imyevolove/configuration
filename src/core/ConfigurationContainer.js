import Configuration from "./Configuration";
import StateAccessor from "./StateAccessor";

/** Предоставляет доступ к управлению данными в контейнере */
export default class ConfigurationContainer
{
    #_values = {};
    #_configuration;

    constructor(configuration)
    {
        this.#_configuration = configuration;
    }

    /** 
     * Возвращает объект конфигурации, к которому принадлежит контейнер.
     * @returns {Configuration}
     */
    get configuration()
    {
        return this.#_configuration;
    }

    /**
     * Получение значения по ключу.
     * @param {string} key
     */
    get(key)
    {
        if (!this.has(key)) return null;
        return this.#_values[key];
    }

    /**
     * Получение значения по массиву ключей (пути).
     * @param {Array<string>} keys
     * @param {number} index
     */
    search(keys, index = 0)
    {
        for (let currentIndex = index; currentIndex < keys.length; currentIndex++)
        {
            let key = keys[currentIndex];

            // Ключ не найден
            if (!this.has(key)) break;

            // Далее идет контейнер, можно продолжать получать данные
            if (this.#_values[key] instanceof ConfigurationContainer)
            {
                return this.#_values[key].search(keys, ++index);
            }

            // Не дало результатов
            if (index < keys.length - 1)
            {
                return null;
            }
            
            // Достигнут конец пути
            return new StateAccessor(this, key);
        }

        return null;
    }

    /**
     * Устанавливает значение по ключу.
     * @param {string} key
     * @param {any} value
     */
    set(key, value)
    {
        this.#_values[key] = value;
    }

    /**
     * Устанавливает значение по массиву ключей (пути).
     * @param {Array<string>} keys
     * @param {any} value
     * @param {number} index
     */
    setRecursive(keys, value, index = 0)
    {
        for (let currentIndex = index; currentIndex < keys.length; currentIndex++)
        {
            let key = keys[currentIndex];

            // Достигнут конец пути
            if (currentIndex >= keys.length - 1)
            {
                this.#_values[key] = value;
                return true;
            }

            // Ключ не найден
            if (!this.has(key))
            {
                this.#_values[key] = new ConfigurationContainer(this.#_configuration);
            }

            // Не контейнер
            else if (!(this.#_values[key] instanceof ConfigurationContainer))
            {
                return false;
            }

            // Продолжаем
            return this.#_values[key].setRecursive(keys, value, ++index);

        }

        return false;
    }

    /**
     * Вернет true, если ключ существует в контейнере.
     * @param {string} key
     */
    has(key)
    {
        return this.#_values.hasOwnProperty(key);
    }

    /**
     * Удаляет значение по ключу.
     * @param {string} key
     */
    delete(key)
    {
        if (!this.has(key)) return false;
        return delete this.#_values[key];
    }
}