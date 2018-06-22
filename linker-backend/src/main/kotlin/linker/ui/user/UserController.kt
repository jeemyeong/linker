package linker.ui.user

import linker.app.user.UserCommand
import linker.app.user.UserService
import linker.infra.annotation.Authenticated
import linker.infra.auth.Role
import linker.infra.helper.SignHelper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 14/06/2018
 * Time: 12:26 AM
 */
@CrossOrigin(value = ["http://localhost:3000"], allowCredentials = "true")
@RestController
@RequestMapping(value = ["/user"])
@Controller
class UserController {
    @Autowired
    lateinit var userService: UserService
    @Autowired
    lateinit var signHelper: SignHelper

    @RequestMapping(value = ["/sign-in/google"], method = [(RequestMethod.POST)])
    fun signInWithGoogle(@RequestBody signInCommand: UserCommand.SignInCommand, response: HttpServletResponse): UserDto {
        val user = userService.signInWithGoogle(signInCommand.accessToken)
        val token = signHelper.createToken(user.id, listOf(Role.ROLE_CLIENT))
        val cookie = Cookie("JWT", token)
        cookie.domain = "localhost"
        cookie.path = "/"
        response.addCookie(cookie)
        return UserDto.fromDomain(user)
    }

    @Authenticated
    @RequestMapping(value = ["/sign-in/token"], method = [(RequestMethod.GET)])
    fun signInWithToken(response: HttpServletResponse): Any? {
        val user = userService.findUserById(signHelper.getUserId()).orElseThrow { InternalError("Cannot find user") }
        val token = signHelper.createToken(user.id, listOf(Role.ROLE_CLIENT))
        val cookie = Cookie("JWT", token)
        cookie.domain = "localhost"
        cookie.path = "/"
        response.addCookie(cookie)
        return UserDto.fromDomain(user)
    }

    @RequestMapping(value = ["/sign-out"], method = [(RequestMethod.GET)])
    fun signOut(response: HttpServletResponse): Any? {
        val cookie = Cookie("JWT", "deleted")
        cookie.domain = "localhost"
        cookie.path = "/"
        cookie.maxAge = -1
        response.addCookie(cookie)
        return HttpServletResponse.SC_OK
    }
}