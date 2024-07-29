# Itorum test task

Приложение построено на базе [GitHubRestApi](https://docs.github.com/en/rest?apiVersion=2022-11-28), реализован основной функционал: поиск пользователей (главная страница), по клику на карточку пользователя осуществляется переход на страницу с информацией о репозиториях пользователя.

Требования по инструментам (React, Redux-Toolkit, Typescript) были соблюдены. Дополнительно были использованы Webpack, в качестве сборщика, SCSS в качестве препроцессора для написания кода стилей, vercel, в качестве площадки для деплоя.

## Установка

Для локального запуска проекта необходимо склонировать репозиторий ([Как клонировать репозиторий?](https://docs.github.com/ru/repositories/creating-and-managing-repositories/cloning-a-repository)), перейти в корень проекта и в терминале выполнить команду:
```
npm install
```
После установки зависимостей необходимо выполнить команду:

```
npm start
```
Для запуска сервера (по умолчанию на 3000 порту)

## Особенности 
В проекте использована библиотека **Octokit**, в качестве api client. Ее использование обусловлено рекомендациями github. Я хотел использовать нативный fetch, но ошибка CORS победила и я сдался (проксировать запросы я тоже пытался, но успеха не достиг) :)

Документация Github рекомендуют создать токен авторизации для снятия ограничений по кол-ву запросов. Для этого необходимо создать в корне проекта файл **.env** с содержимым:
```
AUTH_TOKEN=ваш_token_тут
```
Если этого не сделать, то в качестве auth будет передана пустая строка - это работает, но как уже упоминалось раннее, может быть определенный лимит на кол-во запросов.

Подробнее, если необходимо, то можно почитать в документации [Authenticating to the REST API](https://docs.github.com/en/rest/authentication/authenticating-to-the-rest-api?apiVersion=2022-11-28)


## Немного о коде

С первого взгляда могут показать слишком сложными для восприятия компоненты типа таких:
 > src/pages/main/main.tsx
```jsx
<main  className='main-page'>
	{error && <ErrorIndicator  errorMessage='Something went wrong'  />}
	{loading === LoadingState.LOADING && error === null && <Loader  />}
	{users.length  >  0
		? loading === LoadingState.IDLE && <ProfileList  users={users}  />
		: loading === LoadingState.IDLE && <ProfileListEmpty  />}
	{maxPages  >  1 && users.length  >  0 && loading === LoadingState.IDLE && (
	<Pagination  maxPages={maxPages}  />)}
</main>
```
Если у вас возникнут вопросы по коду, то всегда можете спросить или попросить произвести рефакторинг :) 

---
В коде старался использовать search-params, считаю это важной особенностью при проектировании приложений в которых есть логика по поиску/фильтрации/сортировки, чтобы была возможность отправить ссылку на полученный. Насколько это получилось - вам оценивать.

Пример такого кода:
>src/components/search-form/search-form.tsx
```jsx
const  onSubmitForm  = (e:  React.FormEvent<HTMLFormElement  |  HTMLButtonElement>) => {
	e.preventDefault();
	
	dispatch(getUsers({ login:  currentSearchValue, page:  1 }));
	setSearchParams(() =>  `${SearchParam.LOGIN}=${currentSearchValue}&${SearchParam.PAGE}=1`);
};
```
---
В проекте есть несколько компонентов/страниц для состояний:

**Loading**:
>src/components/loader/loader.tsx

**Error**
> src/components/error-indicator/error-indicator.tsx

**Not Found Page**
>src/pages/not-found/not-found.tsx
---
Если возникнут какие-то вопросы - обращайтесь, буду рад на них ответить.

**AZ**
