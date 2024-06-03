
export const successEmailValidation = {
    messageText: "El email fue validado correctamente!.",
    buttonText: "Iniciar sesión",
    navigateTo: "/login",
    messageClassName: "text-base sm:text-lg md:text-xl lg:text-2xl text-info",
    buttonClassName: ""
}

export const invalidEmailValidation = {
    messageText: "El token es invalido o expiró.",
    buttonText: "Regresar a inicio",
    navigateTo: "/",
    messageClassName: "text-base sm:text-lg md:text-xl lg:text-2xl text-error",
    buttonClassName: "bg-error hover:bg-opacity-70 hover:bg-error"
}