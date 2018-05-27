package linker.controller

import linker.dto.*
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
    fun getMyInformation(@PathVariable id: Long): UserResponse =
            userService.findById(id = id)
                    .let { user -> UserDto.fromDomain(user = user) }
                    .let { user -> UserResponse(user = user) }

    @GetMapping("/all")
    fun all(): UserListResponse =
            userService.findAllUser()
                    .map { user -> UserDto.fromDomain(user = user) }
                    .let { list -> UserListResponse(users = list) }

    @PostMapping("/")
    fun new(@RequestBody signUpCommand: SignUpCommand): UserResponse =
            userService.signUp(signUpCommand = signUpCommand)
                    .let { user -> UserDto.fromDomain(user = user) }
                    .let { user -> UserResponse(user = user) }

    @GetMapping("/{userEmail}/links")
    fun getListIPost(@PathVariable userEmail: String): LinkListResponse =
            linkService.findAllLinkByUser(email = userEmail)
                    .map { LinkDto.fromDomain(it) }.sortedBy { it.order }
                    .let { list -> LinkListResponse(links = list) }

    @GetMapping("/{id}/categories")
    fun getCategories(@PathVariable id: Long): UserResponse =
            userService.findById(id = id)
                    .let { user -> UserDto.fromDomain(user) }
                    .let { user -> UserResponse(user = user) }
}
