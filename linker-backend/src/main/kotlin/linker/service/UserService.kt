package linker.service

import linker.dto.SignUpCommand
import linker.dto.toDomain
import linker.entity.User
import linker.repository.UserRepository
import org.springframework.stereotype.Service

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

    fun findByEmail(email: String): User {
        return userRepository.findByEmail(email).firstOrNull() ?: throw IllegalArgumentException("Cannot find by email: $email")
    }

    fun findById(id: Long): User {
        return userRepository.findById(id).orElseThrow { throw IllegalArgumentException("Cannot find by userId: $id") }
    }

    fun signUp(signUpCommand: SignUpCommand): User {
        userRepository.findByEmail(signUpCommand.email).firstOrNull()?.let {
            throw IllegalArgumentException("Already Signed Email: ${signUpCommand.email}")
        } ?: return userRepository.save(signUpCommand.toDomain())
    }
}
