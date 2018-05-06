package linker

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.persistence.*
import javax.validation.constraints.Email

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 01/05/2018
 * Time: 11:38 PM
 */
@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun findByEmail(email: String): List<User>
}

@CrossOrigin
@RestController
@RequestMapping("/users")
class UserController(val userService: UserService, val linkService: LinkService) {

    @GetMapping("/{id}/info")
    fun getMyInformation(@PathVariable id: Long) = userService.findById(id)

    @GetMapping("/all")
    fun all(): MutableIterable<User> = userService.findAllUser()

    @PostMapping("/")
    fun new(@RequestBody signUpUserDto: SignUpUserDto): User = userService.signUp(signUpUserDto)

    @GetMapping("/{userEmail}/links")
    fun getListIPost(@PathVariable userEmail: String): UserWithLinksDto = linkService.findAllLinkByUser(email = userEmail)
}

@Service
class UserService(val userRepository: UserRepository) {
    fun findAllUser(): MutableIterable<User> {
        return userRepository.findAll()
    }

    fun findById(id: Long): Optional<User> {
        return userRepository.findById(id)
    }

    fun signUp(signUpUserDto: SignUpUserDto): User {
        return userRepository.save(User.fromDto(signUpUserDto))
    }
}

@Entity
@Table(name = "users", uniqueConstraints=[UniqueConstraint(columnNames=["email"])])
data class User(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0,
        @field:Column(nullable = false)
        @field:Email
        val email: String
) {
    fun toDto(): UserDto = UserDto(
            id = this.id,
            email = this.email
    )

    companion object {
        fun fromDto(dto: UserDto) = User(
                id = dto.id,
                email = dto.email
        )

        fun fromDto(dto: SignUpUserDto) = User(
                email = dto.email
        )
    }
}

data class UserDto(
        var id: Long,
        var email: String
)


data class SignUpUserDto(val email: String)