package linker.ui.user

import linker.app.board.BoardService
import linker.app.user.UserCommand
import linker.app.user.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 14/06/2018
 * Time: 12:26 AM
 */
@CrossOrigin
@RestController
@RequestMapping(value = ["/user"])
@Controller
class UserController {
    @Autowired
    lateinit var userService: UserService
    @Autowired
    lateinit var boardService: BoardService
    @RequestMapping(value = ["/sign-in/google"], method = [(RequestMethod.POST)])
    fun signIn(@RequestBody signInCommand: UserCommand.SignInCommand): UserDto {
        val user = userService.signIn(signInCommand.accessToken)
        val boards = boardService.findByUserId(user.id)
        return UserDto.fromDomain(user, boards)
    }
}