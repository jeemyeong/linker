package linker.controller

import linker.dto.LinkDto
import linker.dto.SignUpCommand
import linker.dto.UserDto
import linker.dto.fromDomain
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
    fun getMyInformation(@PathVariable id: Long) = userService.findById(id = id).let { user -> UserDto.fromDomain(user = user) }

    @GetMapping("/all")
    fun all(): List<UserDto> = userService.findAllUser().map { user -> UserDto.fromDomain(user = user) }

    @PostMapping("/")
    fun new(@RequestBody signUpCommand: SignUpCommand): UserDto = userService.signUp(signUpCommand = signUpCommand).let { user -> UserDto.fromDomain(user = user) }

    @GetMapping("/{userEmail}/links")
    fun getListIPost(@PathVariable userEmail: String): List<LinkDto> = linkService.findAllLinkByUser(email = userEmail).map { LinkDto.fromDomain(it) }.sortedBy { it.order }
}
