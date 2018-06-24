package linker.app.user

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 14/06/2018
 * Time: 1:17 AM
 */

sealed class UserCommand {
    class SignInCommand(val accessToken: String)
}