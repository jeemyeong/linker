package linker.controller

import linker.dto.SignUpCommand
import linker.dto.UserWithLinksDto
import linker.entity.User
import linker.service.LinkService
import linker.service.UserService
import org.springframework.web.bind.annotation.*

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 01/05/2018
 * Time: 11:38 PM
 */


@CrossOrigin
@RestController
@RequestMapping("/users")
class UserController(val userService: UserService, val linkService: LinkService) {

    @GetMapping("/{id}/info")
    fun getMyInformation(@PathVariable id: Long) = userService.findById(id = id)

    @GetMapping("/all")
    fun all(): MutableIterable<User> = userService.findAllUser()

    @PostMapping("/")
    fun new(@RequestBody signUpCommand: SignUpCommand): User = userService.signUp(signUpCommand = signUpCommand)

    @GetMapping("/{userEmail}/links")
    fun getListIPost(@PathVariable userEmail: String): UserWithLinksDto = linkService.findAllLinkByUser(email = userEmail)
}


