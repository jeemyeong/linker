package linker.app.user

import linker.entity.User
import linker.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 29/05/2018
 * Time: 1:27 AM
 */

interface UserService {
    fun findUserById(id: Long): Optional<User>
}

@Service
class UserServiceImpl: UserService {
    @Autowired
    lateinit var userRepository: UserRepository

    override fun findUserById(id: Long): Optional<User> = userRepository.findById(id)

}

