# Вычислитель отличий
[![Maintainability](https://api.codeclimate.com/v1/badges/74e9f2b4cb25936fe534/maintainability)](https://codeclimate.com/github/mika193/gendiff/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/74e9f2b4cb25936fe534/test_coverage)](https://codeclimate.com/github/mika193/gendiff/test_coverage)
[![Build Status](https://travis-ci.org/mika193/gendiff.svg?branch=master)](https://travis-ci.org/mika193/gendiff)

Вычислитель отличий представляет из себя утилиту для поиска отличий в конфигурационных файлах.

## Возможности утилиты:

* Поддержка разных форматов
* Генерация отчета в виде plain text, pretty и json

## Пример использования:

$ gendiff --format plain first-config.ini second-config.ini  
Property 'timeout' was updated. From 50 to 20  
Property 'proxy' was removed  
Property 'follow' was removed  
Property 'verbose' was added with value: true  


### Установка пакета и вывод справки
[![asciicast](https://asciinema.org/a/RJ99D8crIi84UtiImACP2KATV.svg)](https://asciinema.org/a/RJ99D8crIi84UtiImACP2KATV)

### Поиск diff между двумя JSON
[![asciicast](https://asciinema.org/a/MTijcPSQebEqu7bO39ADlQ3Ge.svg)](https://asciinema.org/a/MTijcPSQebEqu7bO39ADlQ3Ge)

### Поиск diff между двумя yaml
[![asciicast](https://asciinema.org/a/CAL2rVtDghkPEyJ2sBUVfBt15.svg)](https://asciinema.org/a/CAL2rVtDghkPEyJ2sBUVfBt15)

### Поиск diff между двумя ini
[![asciicast](https://asciinema.org/a/dlQE6SC30rfFoD3uFc8GKZYmN.svg)](https://asciinema.org/a/dlQE6SC30rfFoD3uFc8GKZYmN)

### Поиск diff между двумя рекурсивными структурами в формате json, yaml, ini
[![asciicast](https://asciinema.org/a/klRIA4Urh4PDDvyAdDO8Cm0ax.svg)](https://asciinema.org/a/klRIA4Urh4PDDvyAdDO8Cm0ax)

### Вывод diff между двумя файлами в формате plain
[![asciicast](https://asciinema.org/a/icQrUVF2boPwP1QZopSeYL0l7.svg)](https://asciinema.org/a/icQrUVF2boPwP1QZopSeYL0l7)

### Вывод diff между двумя файлами в формате JSON
[![asciicast](https://asciinema.org/a/UNgptOVh0qvti7iAWWF1t9k9f.svg)](https://asciinema.org/a/UNgptOVh0qvti7iAWWF1t9k9f)
