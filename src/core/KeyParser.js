const keyValidator = new RegExp(/^[a-zA-Z0-9:_]+$/g);

/**
 * Предоставляет доступ к методам для работы с ключом.
 * */
class KeyParser
{
    /**
     * Разбирает ключ и возвращает его по частям
     * @param {string} key
     * @returns {Array<string>}
     */
    parse(key)
    {
        return key.split(":");
    }

    /**
     * Вернет true, если предоставленный ключ является строкой
     * @param {string} key
     * @returns {boolean}
     */
    isString(key)
    {
        return typeof key == "string";
    }

    /**
     * Вернет true, если предоставленный ключ не имеет запрещенных символов
     * @param {string} key
     * @returns {boolean}
     */
    isValid(key)
    {
        let result = keyValidator.test(key);

        keyValidator.lastIndex = 0;

        return result;
    }
}

export default new KeyParser();