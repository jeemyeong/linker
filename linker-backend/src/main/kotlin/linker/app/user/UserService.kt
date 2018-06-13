package linker.app.user

import linker.domain.user.User
import linker.infra.rest.GoogleOAuthResponse
import linker.infra.rest.GoogleOAuthRestManager
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
    fun signIn(googleToken: String): User
}

@Service
class UserServiceImpl: UserService {
    @Autowired
    lateinit var userRepository: UserRepository
    @Autowired
    lateinit var googleAuthRestManager: GoogleOAuthRestManager

    override fun findUserById(id: Long): Optional<User> = userRepository.findById(id)

    override fun signIn(googleToken: String): User {
        val googleOAuthResponse: GoogleOAuthResponse = googleAuthRestManager.getProfileFromGoogle(googleToken)
        var user = userRepository.findByEmail(googleOAuthResponse.email)
        if (user == null) {
            user = User(
                    email = googleOAuthResponse.email,
                    googleId = googleOAuthResponse.id,
                    name = googleOAuthResponse.name,
                    link = googleOAuthResponse.link,
                    locale = googleOAuthResponse.locale,
                    picture = googleOAuthResponse.picture
            )
        } else {
            user.googleId = googleOAuthResponse.id
            user.name = googleOAuthResponse.name
            user.link = googleOAuthResponse.link
            user.locale = googleOAuthResponse.locale
            user.picture = googleOAuthResponse.picture
        }
        userRepository.save(user)
        return findUserById(user.id).get()
    }
}