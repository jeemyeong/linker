package linker.entity

import javax.persistence.*
import javax.validation.constraints.Email

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
        @field:Column(nullable = false)
        @field:Email
        val email: String,
        @field:OneToMany(targetEntity = Board::class)
        @field:JoinColumn(name = "user_id")
        val boards: List<Board>
)
