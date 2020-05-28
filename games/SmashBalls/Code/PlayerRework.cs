using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class PlayerRework : MonoBehaviour {

    //general player movement variables
    public float moveSpeed;
    public float jumpForce;
    private int extraJumps;
    public int jumpsAmount;
    private Rigidbody rb;

    //knockback variables
    public float KnockbackForce;
    public float knockBackTime;
    private float knockBackCounter;
    public float weaknessLevel;

    //ground variables
    private float groundCheckRadius = 0.5f;
    public LayerMask groundLayer;
    private bool grounded;

    //shooting variables
    public Transform Firepoint;
    public Rigidbody bulletPrefab;
    public float bulletForce;
    public float rotateSpeed;
    private int cooldown = 0;
    public float gunForce;
    public Transform gunForcePoint;
    private float power;
    private float minPower = 0f;
    public float maxPower;

    //other variables
    public bool isPlayer1; //determines who is player1 and not
    public Transform deathZone; //determines where the players can die
    public int lives;
    [SerializeField] private string loadLevel;
    //public GameObject Player1Won;
    //public GameObject Player2Won;

    // Use this for initialization
    void Start () {
        rb = GetComponent<Rigidbody>();
        //Player1Won.SetActive(false);
        //Player2Won.SetActive(false);
        weaknessLevel = 5f;
	}
	
	// Update is called once per frame
	void Update () {
        if (grounded)
        {
            extraJumps = jumpsAmount;
        }
        if (knockBackCounter <= 0)
        {
            if (isPlayer1)
            {
                if (Input.GetKey(KeyCode.A))
                {
                    rb.velocity = new Vector3(-moveSpeed, rb.velocity.y, rb.velocity.z);
                }
                else if (Input.GetKey(KeyCode.D))
                {
                    rb.velocity = new Vector3(moveSpeed, rb.velocity.y, rb.velocity.z);
                }
                else
                {
                    rb.velocity = new Vector3(rb.velocity.x, rb.velocity.y, rb.velocity.z);
                }
                if (Input.GetKeyUp(KeyCode.A))
                {
                    rb.velocity = new Vector3(0, rb.velocity.y, rb.velocity.z);
                }
                else if (Input.GetKeyUp(KeyCode.D))
                {
                    rb.velocity = new Vector3(0, rb.velocity.y, rb.velocity.z);
                }
                if (Input.GetKeyDown(KeyCode.Space) && extraJumps > 0)
                {
                    rb.velocity = new Vector3(rb.velocity.x, jumpForce, rb.velocity.z);
                    extraJumps--;
                }
            } else
            {
                if (Input.GetKey(KeyCode.LeftArrow))
                {
                    rb.velocity = new Vector3(-moveSpeed, rb.velocity.y, rb.velocity.z);
                }
                else if (Input.GetKey(KeyCode.RightArrow))
                {
                    rb.velocity = new Vector3(moveSpeed, rb.velocity.y, rb.velocity.z);
                }
                else
                {
                    rb.velocity = new Vector3(rb.velocity.x, rb.velocity.y, rb.velocity.z);
                }
                if (Input.GetKeyUp(KeyCode.LeftArrow))
                {
                    rb.velocity = new Vector3(0, rb.velocity.y, rb.velocity.z);
                }
                else if (Input.GetKeyUp(KeyCode.RightArrow))
                {
                    rb.velocity = new Vector3(0, rb.velocity.y, rb.velocity.z);
                }
                if (Input.GetKeyDown(KeyCode.UpArrow) && extraJumps > 0)
                {
                    rb.velocity = new Vector3(rb.velocity.x, jumpForce, rb.velocity.z);
                    extraJumps--;
                }
            }
        }
        else
        {
            knockBackCounter -= Time.deltaTime;
        }
        if (isPlayer1)
        {
            if (Input.GetKey(KeyCode.R))
            {
                transform.Rotate(new Vector3(0, 0, rotateSpeed * Time.deltaTime));
            }
            else if (Input.GetKey(KeyCode.T))
            {
                transform.Rotate(new Vector3(0, 0, -rotateSpeed * Time.deltaTime));
            }
            if (Input.GetKey(KeyCode.S) && cooldown > 50)
            {
                if (power <= maxPower)
                {
                    power += 400 * Time.deltaTime;
                }
            }
            if (Input.GetKeyUp(KeyCode.S) && cooldown > 50)
            {
                Shoot();
            }
        } else
        {
            if (Input.GetKey(KeyCode.O))
            {
                transform.Rotate(new Vector3(0, 0, rotateSpeed * Time.deltaTime));
            }
            else if (Input.GetKey(KeyCode.P))

            {
                transform.Rotate(new Vector3(0, 0, -rotateSpeed * Time.deltaTime));
            }
            if (Input.GetKey(KeyCode.I) && cooldown > 50)
            {
                if (power <= maxPower)
                {
                    power += 400 * Time.deltaTime;
                }
            }
            if (Input.GetKeyUp(KeyCode.I) && cooldown > 50)
            {
                Shoot();
            }
        }
        cooldown++;
        Debug.DrawRay(transform.position, Vector3.down * groundCheckRadius, Color.green);
        if(transform.position.y <= -10)
        {
            Deathzone();
        }
    }
    void FixedUpdate()
    {
        grounded = Physics.Raycast(transform.position, Vector3.down, groundCheckRadius, groundLayer);
    }
    void OnCollisionEnter(Collision col)
    {
        if (isPlayer1)
        {
            if (col.gameObject.tag == "Player2Bullet")
            {
                knockBackCounter = knockBackTime;
                Vector3 pushDirection = col.transform.position - transform.position;
                pushDirection = pushDirection.normalized;
                rb.AddForce(-pushDirection * KnockbackForce * weaknessLevel);
                weaknessLevel += 10;
            }
        }
        else
        {
            if (col.gameObject.tag == "Player1Bullet")
            {
                knockBackCounter = knockBackTime;
                Vector3 pushDirection = col.transform.position - transform.position;
                pushDirection = pushDirection.normalized;
                rb.AddForce(-pushDirection * KnockbackForce * weaknessLevel);
                weaknessLevel += 10f;
            }
        }
    }
    void Shoot()
    {
        cooldown = 0;
        Rigidbody bulletInstance;
        bulletInstance = Instantiate(bulletPrefab, Firepoint.position, Firepoint.rotation) as Rigidbody;
        bulletInstance.AddForce(Firepoint.up * bulletForce);
        rb.AddForce(gunForcePoint.up * power);
        power = minPower;
    }
    void Deathzone()
    {
        lives--;
        weaknessLevel = 5f;
        transform.position = new Vector3(Random.Range(-8, 8), 20, 0);
        if(lives <= 0)
        {
            if(isPlayer1)
            {
                //Player2Won.SetActive(true);
                Debug.Log("Player 2 Won!");
            } else
            {
                //Player1Won.SetActive(true);
                Debug.Log("Player 1 Won!");
            }
            Die();
        }
    }
    void Die()
    {
        Destroy(gameObject);
    }
}
