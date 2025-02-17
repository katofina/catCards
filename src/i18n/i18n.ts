import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).use(initReactI18next).init({
    fallbackLng: "en",
    debug: true,
    resources: {
        en: {
            translation: {
                initialText: "Kittens that melts your heart",
                goAhead: "Go ahead",
                savedPhotos: "Your saved photos of cats:",
                noPhotos: "No saved cats yet.",
                signIn: "Sign In",
                signUp: "Sign Up",
                profile: "Profile",
                signOut: "Sign Out",
                loading: "Loading...",
                httpError: "Error of HTTP:",
                error: "Error",
                loadMore: "Load more",
                failedFetch: "Failed to fecth data.",
                search: "Search",
                download: "Download",
                save: "Save",
                category: "Category: ",
                breed: "Breed: ",
                unknown: "Unknown",
                learn: "Learn",
                needLogIn: "To add to profile, you need to log in.",
                email: "Email",
                password: "Password",
                emailRequired: "Email is required",
                invalidEmail: "Invalid email format",
                passwordRequired: "Password is required",
                invalidPassword: "Password must be at least 6 characters long",
                continue: "Continue",
                loginError: "Please check the correctness of the entered data or register.",
                Name: "Breed",
                Temperament: "Temperament",
                Description: "Description",
                Origin: "Country",
                ["Life span"]: "Life span",
                ["Child friendly"]: "Child friendly",
                ["Dog friendly"]: "Dog friendly",
                ["Energy level"]: "Energy level",
                Hypoallergenic: "Hypoallergenic",
            }
        },
        ru: {
            translation: {
                initialText: "Котики, которые растопят твоё сердце",
                goAhead: "Вперёд",
                savedPhotos: "Ваши сохранённые фото котиков:",
                noPhotos: "Вы ещё не сохранили ни одно фото.",
                signIn: "Войти",
                signUp: "Создать аккаунт",
                profile: "Профиль",
                signOut: "Выйти",
                loading: "Загрузка...",
                httpError: "Ошибка HTTP:",
                error: "Ошибка",
                loadMore: "Загрузить ещё",
                failedFetch: "Ошибка загрузки данных.",
                search: "Поиск",
                download: "Скачать",
                save: "Сохранить",
                category: "Категория: ",
                breed: "Порода: ",
                unknown: "Неизветсно",
                learn: "Узнать больше",
                needLogIn: "Чтобы сохранить в профиль, вам надо войти.",
                email: "Почта",
                password: "Пароль",
                emailRequired: "Почта обязательна",
                invalidEmail: "Неправильный формат почты",
                passwordRequired: "Пароль обязателен",
                invalidPassword: "Пароль должен состоять хотя бы из 6 символов",
                continue: "Продолжить",
                loginError: "Проверьте введённые данные или зарегистрируйтесь.",
                Name: "Порода",
                Temperament: "Темперамент",
                Description: "Описание",
                Origin: "Страна",
                ["Life span"]: "Возраст",
                ["Child friendly"]: "Кот для детей",
                ["Dog friendly"]: "Кот для собак",
                ["Energy level"]: "Подвижность",
                Hypoallergenic: "Гипоаллергенный",
            }
        }
    }
})

export default i18n;