package linker.domain.user

import javax.persistence.*

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:42 PM
 */
@Entity
@Table(name = "users", uniqueConstraints=[(UniqueConstraint(columnNames = ["email"]))])
data class User(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0,
        @field:Column(name = "email", nullable = false, unique=true)
        val email: String,
        var googleId: String?,
        var name: String?,
        var link: String?,
        var locale: String?,
        var picture: String?,
        var provider: String?,
        var role: String?
)
