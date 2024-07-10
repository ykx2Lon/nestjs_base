export const Regex = {
    USER_ID:/^\w{4,20}$/,
    USER_NAME:/^.{1,20}$/,
    USER_PASSWORD:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\w{8,25}$/,
}