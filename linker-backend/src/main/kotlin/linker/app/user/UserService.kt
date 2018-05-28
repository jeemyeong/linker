package linker.app.user

import linker.domain.user.User
import linker.infra.user.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 29/05/2018
 * Time: 2:29 AM
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