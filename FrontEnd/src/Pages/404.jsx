import { useTranslation } from "react-i18next";

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <>
            <section className="error404 text-danger">
                <img src="assets/img/logo.png" alt="logo iliberp" width={600} />
                <h1 className="code m-0 p-0">404</h1>
                <h1 className="text m-0 p-0">{t('noEncontrado')}</h1>
            </section>
        </>
    );
}