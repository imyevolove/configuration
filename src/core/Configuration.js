import keyParser from "./KeyParser"
import ConfigurationContainer from "./ConfigurationContainer";
import State from "./State";

/** Предоставляет доступ к управлению и изменению конфигураций */
export default class Configuration
{
    #_container;

    constructor()
    {
        this.#_container = new ConfigurationContainer(this);
    }

    /**
     * Устанавливает значение по ключу.
     * Например, можно установить ключ log:enabled и значение true.
     * @param {string} key
     * @param {any} value
     */
    set(key, value)
    {
        Configuration.validateKey(key);

        let parts = keyParser.parse(key);

        Configuration.validateKeyParts(parts);

        /** @type {ConfigurationContainer} */
        let container = this.#_container;

        return container.setRecursive(parts, value);
    }

    /**
     * Получение значение по ключу.
     * @param {any} key
     */
    get(key)
    {
        Configuration.validateKey(key);

        let parts = keyParser.parse(key);

        Configuration.validateKeyParts(parts);

        /** @type {ConfigurationContainer} */
        let container = this.#_container;
        
        let accessor = container.search(parts);
        return !accessor ? null : new State(accessor);
    }

    /**
     * Проверяет ключ на удовлетворение всем условиям ключа.
     * @param {string} key
     */
    static validateKey(key)
    {
        if (!keyParser.isString(key)) throw "Key must be a string type";
        if (!keyParser.isValid(key)) throw "Key is invalid";
    }

    /**
    * Проверяет предоставленные части пути.
    * @param {Array<string>} parts
    */
    static validateKeyParts(parts)
    {
        if (parts.some(key => key === "")) throw "At least one key is empty";
    }

    static create()
    {
        return new Configuration();
    }
}