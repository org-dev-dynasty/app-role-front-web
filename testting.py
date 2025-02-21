import boto3

def atualizar_custom_role(user_pool_id, username, novo_role="OWNER"):
    """
    Atualiza o atributo custom:role de um usuário no User Pool do Cognito.

    :param user_pool_id: O ID do User Pool do Cognito (ex: "us-east-1_XXXXXXXXX").
    :param username: O username do usuário que você quer atualizar.
    :param novo_role: O valor que você deseja definir para custom:role. Por padrão, "OWNER".
    :return: Resposta da API admin_update_user_attributes do Cognito.
    """

    # Cria o cliente do Cognito Identity Provider
    cognito_client = boto3.client('cognito-idp', region_name='sa-east-1')

    # Chama a função para atualizar os atributos de um usuário
    response = cognito_client.admin_update_user_attributes(
        UserPoolId=user_pool_id,
        Username=username,
        UserAttributes=[
            {
                'Name': 'custom:role',
                'Value': novo_role
            }
        ]
    )

    return response

if __name__ == "__main__":
    # Exemplo de uso:
    USER_POOL_ID = "sa-east-1_5ECHtYB15"  # substitua pelo ID do seu User Pool
    USERNAME = "rodrigo.dsiqueira1@gmail.com"

    resp = atualizar_custom_role(USER_POOL_ID, USERNAME, "OWNER")
    print("Resposta da atualização:", resp)
