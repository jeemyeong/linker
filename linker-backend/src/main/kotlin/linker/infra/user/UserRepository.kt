package linker.infra.user

import linker.domain.user.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:41 PM
 */
@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun findByEmail(email: String): User?
}