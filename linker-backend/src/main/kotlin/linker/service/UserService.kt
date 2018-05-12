package linker.service

import linker.entity.User
import linker.repository.UserRepository
import linker.dto.SignUpCommand
import linker.dto.toDomain
import org.springframework.stereotype.Service
import java.util.*

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:42 PM
 */
@Service
class UserService(val userRepository: UserRepository) {
    fun findAllUser(): MutableIterable<User> {
        return userRepository.findAll()
    }

    fun findById(id: Long): Optional<User> {
        return userRepository.findById(id)
    }

    fun signUp(signUpCommand: SignUpCommand): User {
        userRepository.findByEmail(signUpCommand.email).isNotEmpty().let {
            throw IllegalArgumentException("Already Signed Email: ${signUpCommand.email}")
        }
        return userRepository.save(signUpCommand.toDomain())
    }
}
